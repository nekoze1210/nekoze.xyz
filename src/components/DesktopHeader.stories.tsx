import { Meta, StoryFn } from '@storybook/react'

import { DesktopHeader } from '@/components/DesktopHeader'

const meta = {
  title: 'Components/DesktopHeader',
  component: DesktopHeader,
} as Meta<typeof DesktopHeader>

export default meta
const Template: StoryFn<typeof DesktopHeader> = () => <DesktopHeader />

export const Default = Template.bind({})
