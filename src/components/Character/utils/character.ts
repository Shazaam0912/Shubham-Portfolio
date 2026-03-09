import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (): Promise<GLTF | null> => {
    try {
      const encryptedBlob = await decryptFile(
        "/models/character.enc",
        "Character3D#@"
      );
      const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

      return new Promise<GLTF | null>((resolve, reject) => {
        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;

            // ─── MATERIAL OVERRIDE MAP ─────────────────────────────────────
            // Runtime node names (Three.js strips dots from GLB names).
            // Multi-material mesh "Plane.017" splits into "Plane017" + "Plane017_1".
            //
            // Key findings from GLB analysis:
            //  "default"      → #cccccc, metalness=0  → skin/body/chair/pant/shoe
            //  "Material.027" → #c8c8c8, metalness=1.0 (FULLY METALLIC!) → table top
            //  "Material.028" → #000000, metalness=0  → table trim
            //  "Material.026" → no color, clearcoat   → legs (MeshPhysicalMaterial)
            // ──────────────────────────────────────────────────────────────

            type Override = {
              color: number;
              roughness: number;
              metalness: number;
              envMapIntensity?: number;
            };

            const nodeColorMap: Record<string, Override> = {
              // Skin: light warm brown
              "Ear001":    { color: 0xC8956C, roughness: 0.55, metalness: 0.0 },
              "Hand":      { color: 0xC8956C, roughness: 0.55, metalness: 0.0 },
              "Neck":      { color: 0xC8956C, roughness: 0.55, metalness: 0.0 },
              "Cube002":   { color: 0xC8956C, roughness: 0.55, metalness: 0.0 },
              "Plane007":  { color: 0xC8956C, roughness: 0.55, metalness: 0.0 },
              // Clothing — old money aesthetic
              "BODYSHIRT": { color: 0x6B3A2A, roughness: 0.85, metalness: 0.0 }, // medium warm brown shirt
              "Pant":      { color: 0xC8B89A, roughness: 0.88, metalness: 0.0 }, // beige chino
              "Shoe":      { color: 0x4A2818, roughness: 0.55, metalness: 0.05 }, // medium brown oxford (matches shirt)
              "Sole":      { color: 0x3A1E10, roughness: 0.5,  metalness: 0.05 }, // slightly darker sole
              // Chair shell: warm cream
              "Plane003":  { color: 0xD4C9B8, roughness: 0.8,  metalness: 0.0, envMapIntensity: 0 },
              // Table top: dark walnut — envMapIntensity:0 bypasses scene.environmentIntensity
              "Plane017":   { color: 0x5C3A1E, roughness: 0.6,  metalness: 0.0, envMapIntensity: 0 },
              "Plane017_1": { color: 0x2A1A0A, roughness: 0.65, metalness: 0.0, envMapIntensity: 0 },
              "Plane004":   { color: 0x5C3A1E, roughness: 0.6,  metalness: 0.0, envMapIntensity: 0 },
              "Plane004_1": { color: 0x2A1A0A, roughness: 0.65, metalness: 0.0, envMapIntensity: 0 },
              // Table/chair legs: dark matte metal — envMapIntensity:0 bypasses env map
              "Plane002":  { color: 0x2A2A2A, roughness: 0.5,  metalness: 0.6, envMapIntensity: 0 },
            };

            const applyOverride = (mat: THREE.Material, ov: Override): THREE.Material => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                const m = mat.clone() as THREE.MeshStandardMaterial;
                m.color.setHex(ov.color);
                m.roughness = ov.roughness;
                m.metalness = ov.metalness;
                m.map = null;
                m.emissive.setHex(0x000000);
                m.emissiveIntensity = 0;
                // envMapIntensity: 0 means this material ignores the HDR env map entirely
                m.envMapIntensity = ov.envMapIntensity ?? 1.0;
                if (m instanceof THREE.MeshPhysicalMaterial) {
                  m.clearcoat = 0;
                  m.clearcoatRoughness = 1;
                  m.sheen = 0;
                }
                m.needsUpdate = true;
                return m;
              }
              return mat;
            };

            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: THREE.Object3D) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.frustumCulled = true;

                const ov = nodeColorMap[mesh.name];
                if (ov) {
                  if (Array.isArray(mesh.material)) {
                    mesh.material = mesh.material.map((m) => applyOverride(m, ov));
                  } else {
                    mesh.material = applyOverride(mesh.material, ov);
                  }
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return { loadCharacter };
};

export default setCharacter;
