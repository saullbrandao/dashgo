import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement, ReactElement } from 'react'

type ActiveLinkProps = LinkProps & {
  children: ReactElement
  shouldMatchExactHref?: boolean
}

export const ActiveLink = ({
  children,
  shouldMatchExactHref = false,
  ...restProps
}: ActiveLinkProps) => {
  const { asPath } = useRouter()
  let isActive = false

  if (
    shouldMatchExactHref &&
    (asPath === restProps.href || asPath === restProps.as)
  ) {
    isActive = true
  }

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(restProps.href)) ||
      asPath.startsWith(String(restProps.as)))
  ) {
    isActive = true
  }

  return (
    <Link {...restProps}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50',
      })}
    </Link>
  )
}
