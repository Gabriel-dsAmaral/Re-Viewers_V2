// import { ComponentType } from 'react'
// import { Redirect, Route as ReactRoute, RouteProps } from 'react-router-dom'
// import { useUser } from '../Providers/UserProvider'

// interface Props extends RouteProps {
//   isPrivate?: boolean
//   component: ComponentType
// }

// export const Route = ({
//   isPrivate = false,
//   component: Component,
//   ...rest
// }: Props) => {
//   const { accessToken } = useUser()

//   return (
//     <ReactRoute
//       {...rest}
//       render={() =>
//         isPrivate === !!accessToken ? (
//           <Component />
//         ) : (
//           <Redirect to={isPrivate ? '/' : '/user'} />
//         )
//       }
//     />
//   )
// }

export const Stop = () => {
  return "stop";
};
