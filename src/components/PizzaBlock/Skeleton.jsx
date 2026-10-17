import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={490}
    viewBox="0 0 280 490"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="188" y="429" rx="0" ry="0" width="0" height="1" /> 
    <circle cx="141" cy="135" r="120" /> 
    <rect x="0" y="271" rx="10" ry="10" width="280" height="30" /> 
    <rect x="0" y="322" rx="10" ry="10" width="280" height="90" /> 
    <rect x="167" y="385" rx="0" ry="0" width="2" height="19" /> 
    <rect x="0" y="430" rx="5" ry="5" width="81" height="48" /> 
    <rect x="125" y="430" rx="22" ry="22" width="152" height="48" />
  </ContentLoader>
)

export default Skeleton