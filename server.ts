import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Get OAuth URL
  app.get("/api/auth/url", (req, res) => {
    const appId = (req.query.app_id as string) || process.env.VITE_OCEAN_ENGINE_APP_ID;
    const redirectUri = `${req.protocol}://${req.get("host")}/auth/callback`;
    
    if (!appId) {
      return res.status(400).json({ error: "未检测到 AppID。请在界面填写或配置环境变量 VITE_OCEAN_ENGINE_APP_ID。" });
    }

    // Ocean Engine OAuth URL
    // Scope example: ad_manage, report_service, library_service
    const scope = "[\"ad_manage\",\"report_service\",\"library_service\"]";
    const authUrl = `https://ad.oceanengine.com/openapi/audit/oauth.html?app_id=${appId}&state=jinritoutiao&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    res.json({ url: authUrl });
  });

  // OAuth Callback Route
  app.get(["/auth/callback", "/auth/callback/"], async (req, res) => {
    const { auth_code } = req.query;

    if (!auth_code) {
      return res.send(`
        <html>
          <body>
            <script>
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: 'Missing auth_code' }, '*');
              window.close();
            </script>
          </body>
        </html>
      `);
    }

    // In a real application, you would exchange the code for a token here:
    /*
    const response = await fetch("https://ad.oceanengine.com/open_api/oauth2/access_token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        app_id: process.env.VITE_OCEAN_ENGINE_APP_ID,
        secret: process.env.OCEAN_ENGINE_SECRET,
        grant_type: "auth_code",
        auth_code: auth_code
      })
    });
    const data = await response.json();
    // Then store data.access_token safely
    */

    // For now, we simulate success and notify the main window
    res.send(`
      <html>
        <head>
          <title>授权成功</title>
          <style>
            body { font-family: sans-serif; display: flex; flex-direction: column; items-center; justify-content: center; height: 100vh; text-align: center; }
            .success-icon { color: #10b981; font-size: 48px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="success-icon">✓</div>
          <h1>授权成功</h1>
          <p>正在同步授权状态，请稍候...</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', code: '${auth_code}' }, '*');
              setTimeout(() => window.close(), 1000);
            } else {
              window.location.href = '/';
            }
          </script>
        </body>
      </html>
    `);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
