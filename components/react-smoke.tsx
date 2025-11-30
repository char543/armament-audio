'use client'

import { SmokeScene } from 'react-smoke'
import * as THREE from 'three'

// Create the color outside the component to prevent recreation
// const smokeColor = new THREE.Color('darkslategrey')

// export default function SmokeBackground() {
//   return (
//     <div className='fixed inset-0 z-0 pointer-events-none'>
//       <SmokeScene
//         smoke={{
//           color: smokeColor,
//           density: 50,
//           enableRotation: true,
//           opacity: 0.3,
//           enableWind: false,
//           enableTurbulence: false,
//         }}
//       />
//     </div>
//   )
// }

// Create the color outside the component to prevent recreation
const smokeColor = new THREE.Color('darkblue')

export default function SmokeBackground() {
  return (
    <div className='fixed inset-0 z-0 pointer-events-none'>
      <SmokeScene
        smoke={{
          color: smokeColor,
          density: 20,
          enableRotation: true,
          opacity: 0.7,
          enableWind: false,
          enableTurbulence: false,
        }}
      />
    </div>
  )
}
