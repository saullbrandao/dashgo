import { Link as ChakraLink, LinkProps, Icon, Text } from '@chakra-ui/react'
import { ElementType } from 'react'
import { ActiveLink } from '../ActiveLink'

type NavLinkProps = LinkProps & {
  icon: ElementType
  href: string
  children: string
}

export const NavLink = ({
  icon,
  children,
  href,
  ...restProps
}: NavLinkProps) => {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...restProps}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  )
}
