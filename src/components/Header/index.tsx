import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'

export const Header = () => {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      maxW={1480}
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          aria-label="Open sidebar"
          mr="2"
        ></IconButton>
      )}
      <Logo />

      {isWideVersion && <SearchBox />}
      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileInfo={isWideVersion} />
      </Flex>
    </Flex>
  )
}
