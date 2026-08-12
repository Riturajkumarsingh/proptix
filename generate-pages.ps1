$template = @'
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const PAGE_NAME = () => (
  <>
    <Helmet><title>PAGE_TITLE — Proptix</title></Helmet>
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div style={{ padding: '1rem 0' }}>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#0F1923', marginBottom: '0.5rem' }}>
          PAGE_TITLE
        </h2>
        <p style={{ color: '#9CA3AF' }}>This module is coming soon. Phase build in progress.</p>
      </div>
    </motion.div>
  </>
);

export default PAGE_NAME;
'@

$pages = @{
  "src/pages/admin"     = @("Leads", "Customers", "Projects", "ProjectDetail", "Plots", "Bookings", "Payments", "Associates", "Users", "Reports", "Settings", "Inventory", "Agreements", "Commissions", "Blog", "Gallery", "Support", "Notifications", "AuditLogs", "FollowUps", "SiteVisits", "Quotations", "Enquiries", "Analytics", "Profile")
  "src/pages/associate" = @("Dashboard", "Leads", "Customers", "Plots", "Bookings", "Commissions", "FollowUps", "SiteVisits", "SubAssociates", "Profile", "Notifications")
  "src/pages/customer"  = @("Dashboard", "Properties", "Payments", "Documents", "Support", "Profile", "Notifications")
  "src/pages/website"   = @("ProjectsList", "ProjectDetail", "About", "Contact", "Blog", "BlogDetail", "Gallery", "Career", "Franchise", "Calculator", "BookProperty", "SiteVisit", "Compare", "Wishlist")
}

foreach ($dir in $pages.Keys) {
  $fullDir = "d:\AifutureIndia\realstate\frontend\$dir"
  if (-not (Test-Path $fullDir)) {
    New-Item -ItemType Directory -Path $fullDir -Force | Out-Null
  }
  foreach ($name in $pages[$dir]) {
    $file = "$fullDir\$name.jsx"
    if (-not (Test-Path $file)) {
      $content = $template.Replace("PAGE_NAME", $name).Replace("PAGE_TITLE", $name -replace '([A-Z])', ' $1' -replace '^\s', '')
      Set-Content -Path $file -Value $content -Encoding UTF8
      Write-Host "Created: $dir/$name.jsx" -ForegroundColor Green
    }
    else {
      Write-Host "Exists:  $dir/$name.jsx" -ForegroundColor Yellow
    }
  }
}

Write-Host "`n All scaffold pages generated!" -ForegroundColor Cyan
