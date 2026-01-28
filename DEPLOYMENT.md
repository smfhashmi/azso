# Deployment Guide for Cloudflare Pages

## Fixed Issues

✅ **Taxonomy Layout Warning**: Created `layouts/_default/taxonomy.html` and `layouts/_default/terms.html` to handle tags and categories pages

✅ **Raw HTML Warning**: Added `ignoreLogs` and enabled `unsafe` HTML rendering in `hugo.toml` to allow HTML in markdown files (needed for contact form)

✅ **Static Files**: All logo images are in `static/images/` and will be automatically copied to `public/images/` during build

## Cloudflare Pages Configuration

### Important: Cloudflare Pages vs Cloudflare Workers

- **Cloudflare Pages**: Use Hugo directly (recommended for static sites)
- **Cloudflare Workers**: Uses Wrangler (not needed for Hugo sites)

### Build Settings for Cloudflare Pages Dashboard

When setting up your project in Cloudflare Pages, configure:

1. **Framework preset**: Select "Hugo" (or "None" if Hugo isn't listed)
2. **Build command**: `hugo --minify`
3. **Build output directory**: `public`
4. **Root directory**: `/` (leave empty or use `/`)

### Environment Variables (Optional)

- `HUGO_VERSION`: `0.147.7` or latest (Cloudflare usually auto-detects)

### Build Process

1. Cloudflare Pages runs: `hugo --minify`
2. Hugo processes all content and copies static files
3. Output is generated in `public/` directory
4. Cloudflare Pages deploys the `public/` directory

## Verification

After deployment, verify:
- ✅ Logo images load correctly (`/images/azva_Logo.png`, etc.)
- ✅ No build warnings about taxonomy layouts
- ✅ Contact form HTML renders properly
- ✅ All pages load correctly

## Troubleshooting

If you see "Static files: 0" in build logs:
- This is normal - Hugo counts files differently
- Check that `public/images/` exists after build
- Static files from `static/` are automatically copied

If build fails:
- Ensure Hugo is installed in Cloudflare Pages build environment (usually auto-installed)
- Check that `hugo.toml` is valid
- Verify all required files are committed to git

## Local Testing

To test the build locally:
```bash
hugo --minify
# Check public/ directory for output
ls -la public/images/
```
