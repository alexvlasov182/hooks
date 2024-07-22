import React, { useState, Component, useEffect } from "react";

const Application = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div>
        <button onClick={() => setValue((v) => v + 1)}>+</button>
        <button onClick={() => setVisible(false)}>hide</button>

        <ClassCounter value={value} />
        <HookCounter value={value} />
      </div>
    );
  } else {
    return <button onClick={() => setVisible(true)}>show</button>;
  }
};

const HookCounter = ({ value }: { value: number }) => {
  useEffect(() => {
    console.log("useEffect()");
    return () => console.log("clear");
  }, [value]);
  return <p>{value}</p>;
};

interface ClassCounterProps {
  value: number;
}

class ClassCounter extends Component<ClassCounterProps> {
  componentDidMount(): void {
    console.log("class: mount");
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log("class: update");
  }

  componentWillUnmount(): void {
    console.log("class: unmount");
  }

  render() {
    return <p>{this.props.value}</p>;
  }
}

export default Application;
