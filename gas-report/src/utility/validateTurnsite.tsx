/**
 * Verify user is real and not a bot using cloudflare turnstile
 *
 * Alternative to captcha and is invisible to user
 *
 * Has site code and makes call to static website
 *
 * Validates with server and allows access to user
 *
 * What cloudflare turnstile is:
 *
 * https://developers.cloudflare.com/turnstile/?_gl=1*s8y940*_gcl_dc*R0NMLjE3ODg2NTQ4NTMuZTQ5NmU2OWYxYjMyMWFmZTQ0MTQ4YzAzYWZjOTc0NTc.*_gcl_au*MTY1NjQzMTIzLjE3ODY0MjM4Mzc.*_ga*MWQ3YTdmZjgtNDRiZS00ZDQwLWI0YjYtOTU0Y2I0ZmEzODUw*_ga_SQCRB0TXZW*czE3ODg3MjI5OTUkbzMkZzAkdDE3ODg3MjI5OTUkajYwJGwwJGgwJGRieHVLMkVxUGxKS1RBbXhoaWNLYWluVHdhTFB6MDFjQ3J3
 *
 * Cloudflare recommend implementation:
 *
 * https://developers.cloudflare.com/turnstile/get-started/mobile-implementation/
 * @module */
import { WebView } from "react-native-webview";

export default function ValidateTurnsite() {
  return (
    <WebView
      source={{
        uri: "https://gasreport-turnstile.aflemingrocks089.workers.dev/",
      }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
    />
  );
}
