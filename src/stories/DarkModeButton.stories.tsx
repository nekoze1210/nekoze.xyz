import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import DarkModeButton from '@/components/DarkModeButton'

export default {
  title: 'Components/DarkModeButton',
  component: DarkModeButton,
} as Meta<typeof DarkModeButton>

const Template: StoryFn<typeof DarkModeButton> = () => <DarkModeButton />

export const Dark = Template.bind({})
