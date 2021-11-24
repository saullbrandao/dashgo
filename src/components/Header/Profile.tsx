import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

export const Profile = () => {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Saull Brandão</Text>
        <Text color="gray.300" fontSize="small">
          saull@outlook.com
        </Text>
      </Box>
      <Avatar
        size="md"
        name="Saull Brandão"
        src="https://github.com/saullbrandao.png"
      />
    </Flex>
  )
}
