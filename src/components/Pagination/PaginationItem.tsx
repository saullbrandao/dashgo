import { Button } from '@chakra-ui/react'

type PaginationItemProps = {
  number: number
  isCurrent?: boolean
}

export const PaginationItem = ({
  isCurrent = false,
  number,
}: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <Button
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{ bg: 'pink.500', cursor: 'default' }}
        size="sm"
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      fontSize="xs"
      width="4"
      bg="gray.700"
      _hover={{ bg: 'gray.500' }}
      size="sm"
    >
      {number}
    </Button>
  )
}
