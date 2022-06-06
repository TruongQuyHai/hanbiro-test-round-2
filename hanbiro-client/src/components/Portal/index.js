import { useLayoutEffect, useState } from "react";

const { createPortal } = require("react-dom");

const createContainerAndAppendToBody = (containerId) => {
  const container = document.createElement("div");
  container.id = containerId;
  document.body.appendChild(container);
  return container;
};

const ReactPortal = ({ children, containerId }) => {
  const [container, setContainer] = useState(null);

  useLayoutEffect(() => {
    let element = document.getElementById(containerId);
    let systemCreated = false;

    if (!element) {
      element = createContainerAndAppendToBody(containerId);
      systemCreated = true;
    }
    setContainer(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [containerId]);

  if (container === null) return null;

  return createPortal(children, container);
};

export default ReactPortal;

