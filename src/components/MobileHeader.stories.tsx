import { Meta, StoryFn } from '@storybook/react'

import { MobileHeader } from '@/components/MobileHeader'

const meta = {
  title: 'Components/MobileHeader',
  component: MobileHeader,
} as Meta<typeof MobileHeader>
export default meta

const Template: StoryFn<typeof MobileHeader> = () => <MobileHeader />

export const Default = Template.bind({})
