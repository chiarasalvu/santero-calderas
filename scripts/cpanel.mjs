// Genera el sitio estático para subir a cPanel y lo deja en un .zip.
//
//   npm run zip:cpanel:prueba   -> santero-cpanel-prueba.zip (con noindex,
//                                  para un subdominio de prueba)
//   npm run zip:cpanel          -> santero-cpanel.zip (versión final)
//
// El contenido del zip va directo en la raíz: se descomprime dentro de la
// carpeta del dominio (public_html o la del subdominio), sin subcarpeta.
import { execSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";

const prueba = process.argv.includes("--prueba");
const zip = prueba ? "santero-cpanel-prueba.zip" : "santero-cpanel.zip";

console.log("1/3 Exportando el sitio...");
execSync("npx next build", {
  stdio: "inherit",
  env: { ...process.env, EXPORT_STATIC: "1" },
});

console.log("2/3 Escribiendo .htaccess...");
const noindex = prueba
  ? `
# Sitio de prueba: que Google no lo indexe.
<IfModule mod_headers.c>
  Header set X-Robots-Tag "noindex, nofollow"
</IfModule>
`
  : "";
writeFileSync(
  "out/.htaccess",
  `# Calderas Santero - sitio estático (Next.js export)
ErrorDocument 404 /404.html
DirectoryIndex index.html
Options -Indexes
${noindex}
# Compresión
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain application/javascript application/json image/svg+xml
</IfModule>

# Caché: los archivos de _next llevan hash en el nombre.
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 10 minutes"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType video/mp4 "access plus 1 month"
</IfModule>

# Para forzar HTTPS: activalo desde cPanel > Dominios > Force HTTPS Redirect.
`,
);

console.log(`3/3 Armando ${zip}...`);
rmSync(zip, { force: true });
execSync(`cd out && zip -rq ../${zip} .`, { stdio: "inherit" });
console.log(`Listo: ${zip}`);
