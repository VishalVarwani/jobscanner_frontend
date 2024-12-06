import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      autoPlay: true,
      background: {
        color: {
          value: "transparent"
        },
        opacity: 0
      },
      fullScreen: {
        enable: true,
        zIndex: -1
      },
      detectRetina: true,
      fpsLimit: 120,
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: false,
            mode: []
          },
          onHover: {
            enable: false,
            mode: [],
          },
          resize: {
            delay: 0.5,
            enable: true
          }
        }
      },
      particles: {
        collisions: {
          enable: false
        },
        move: {
          enable: true,
          speed: 1,
          direction: "right",
          outModes: {
            default: "out"
          }
        },
        number: {
          value: 30
        },
        opacity: {
          value: 1
        },
        shape: {
          type: "square"
        },
        size: {
          value: 1
        }
      }
    }),
    []
  );

  return (
    <Particles
      id="tsparticles"
      options={options}
      init={init}
      loaded={particlesLoaded}
    />
  );
};

export default ParticlesComponent;
