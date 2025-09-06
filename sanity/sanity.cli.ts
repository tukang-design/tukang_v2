import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '330f0le5',
    dataset: 'production',
  },
  studioHost: 'tukangdesign',
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
