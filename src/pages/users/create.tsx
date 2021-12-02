import {
  Flex,
  Box,
  Heading,
  Divider,
  VStack,
  HStack,
  SimpleGrid,
  Button,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { useMutation } from 'react-query'
import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'

type CreateUserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createUserFormSchema = yup
  .object({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup
      .string()
      .required('Senha obrigatória')
      .min(6, 'No mínimo 6 caracteres'),
    passwordConfirmation: yup
      .string()
      .oneOf([null, yup.ref('password')], 'Senhas não conferem'),
  })
  .required()

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('/users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      })

      return response.data.user
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    },
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async data => {
    await createUser.mutateAsync(data)

    router.push('/users')
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" w="100%" spacing={['6', '8']}>
              <Input
                name="name"
                label="Nome completo"
                error={errors.name}
                {...register('name')}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" w="100%" spacing={['6', '8']}>
              <Input
                name="password"
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmar Senha"
                error={errors.passwordConfirmation}
                {...register('passwordConfirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
