import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { RxHome } from 'react-icons/rx'

import { HeaderNavigationLink, HeaderNavigationLinkProps } from '@/components/HeaderNavigationLink'

type Props = ComponentProps<typeof HeaderNavigationLink>

const meta = {
  title: 'Components/HeaderNavigationLink',
  component: HeaderNavigationLink,
} as Meta<typeof HeaderNavigationLink>

export default meta

export const Default: StoryObj<HeaderNavigationLinkProps> = {
  args: {
    href: '/',
    icon: RxHome,
    popoverText: 'Home',
    onClick: () => console.log('clicked'),
  },
}
