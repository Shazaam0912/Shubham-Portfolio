// Quick GLB inspector - reads the binary GLB and extracts mesh/material names from JSON chunk
import { readFileSync } from 'fs';

const buf = readFileSync('./public/models/character.glb');

// GLB format: 12-byte header, then chunks
// Chunk 0 is JSON
const chunkLength = buf.readUInt32LE(12);
const jsonStr = buf.slice(20, 20 + chunkLength).toString('utf8');
const json = JSON.parse(jsonStr);

console.log('\n=== MATERIALS ===');
if (json.materials) {
  json.materials.forEach((m, i) => {
    const pbr = m.pbrMetallicRoughness;
    const color = pbr?.baseColorFactor;
    const colorStr = color ? `rgba(${color.map(v => Math.round(v*255)).join(', ')})` : 'no color';
    const roughness = pbr?.roughnessFactor ?? 'default';
    const metalness = pbr?.metallicFactor ?? 'default';
    console.log(`[${i}] "${m.name}" | ${colorStr} | roughness:${roughness} | metalness:${metalness}`);
  });
}

console.log('\n=== NODES with mesh + material ===');
if (json.nodes) {
  json.nodes.forEach((n, i) => {
    if (n.mesh !== undefined) {
      const mesh = json.meshes?.[n.mesh];
      const meshName = mesh?.name || '?';
      // Get material indices from primitives
      const matIndices = mesh?.primitives?.map(p => p.material).filter(m => m !== undefined) || [];
      const matNames = matIndices.map(mi => json.materials?.[mi]?.name || `mat[${mi}]`);
      console.log(`Node "${n.name}" -> Mesh: "${meshName}" -> Materials: [${matNames.join(', ')}]`);
    }
  });
}
