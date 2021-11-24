import { Link, LinkProps, Icon, Text } from '@chakra-ui/react'
import { ElementType } from 'react'

type NavLinkProps = LinkProps & {
  icon: ElementType
  children: string
}

export const NavLink = ({ icon, children, ...restProps }: NavLinkProps) => {
  return (
    <Link display="flex" align="center" {...restProps}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  )
}
