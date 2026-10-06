import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'mmm-airways-site-o9cfy4bs',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_eNT21AZ1VMXnG42wARyCA5hWCIxjb3GT',
  authRequired: false,
  auth: { mode: 'managed' },
})
