// Deep GLB scene analysis - identifies all nodes, materials, and their visual properties
import { readFileSync } from 'fs';

const buf = readFileSync('./public/models/character.glb');
const chunkLength = buf.readUInt32LE(12);
const json = JSON.parse(buf.slice(20, 20 + chunkLength).toString('utf8'));

// Build material lookup
const materials = json.materials || [];
const meshes = json.meshes || [];
const nodes = json.nodes || [];

console.log('\n========== ALL MATERIALS WITH FULL DETAILS ==========');
materials.forEach((m, i) => {
  const pbr = m.pbrMetallicRoughness || {};
  const color = pbr.baseColorFactor;
  const colorHex = color ? '#' + color.slice(0,3).map(v => Math.round(v*255).toString(16).padStart(2,'0')).join('') : 'none';
  const hasTexture = pbr.baseColorTexture ? 'YES' : 'NO';
  const roughness = pbr.roughnessFactor ?? 'default(1.0)';
  const metalness = pbr.metallicFactor ?? 'default(1.0)';
  const hasNormal = m.normalTexture ? 'YES' : 'NO';
  const extensions = m.extensions ? Object.keys(m.extensions).join(',') : 'none';
  console.log(`[${i}] "${m.name}"`);
  console.log(`     color=${colorHex} | texture=${hasTexture} | rough=${roughness} | metal=${metalness} | normal=${hasNormal} | ext=${extensions}`);
});

console.log('\n========== SCENE NODES WITH MESH → MATERIAL MAPPING ==========');
// Build node hierarchy
nodes.forEach((n, i) => {
  if (n.mesh !== undefined) {
    const mesh = meshes[n.mesh];
    if (!mesh) return;
    const prims = mesh.primitives || [];
    prims.forEach((prim, pi) => {
      const matIdx = prim.material;
      const mat = matIdx !== undefined ? materials[matIdx] : null;
      const pbr = mat?.pbrMetallicRoughness || {};
      const color = pbr.baseColorFactor;
      const colorHex = color ? '#' + color.slice(0,3).map(v => Math.round(v*255).toString(16).padStart(2,'0')).join('') : 'none';
      const hasTexture = pbr.baseColorTexture ? '(HAS_TEXTURE)' : '';
      const runtimeName = n.name.replace(/[.\s]/g, '');
      const suffix = pi > 0 ? `_${pi}` : '';
      console.log(`Node[${i}] "${n.name}" → runtime:"${runtimeName}${suffix}" | mat[${matIdx}]="${mat?.name}" | color=${colorHex}${hasTexture}`);
    });
  }
});

console.log('\n========== NODES WITHOUT MESH (parents/bones) ==========');
nodes.forEach((n, i) => {
  if (n.mesh === undefined && !n.skin) {
    console.log(`Node[${i}] "${n.name}" (no mesh) children=[${(n.children||[]).join(',')}]`);
  }
});
