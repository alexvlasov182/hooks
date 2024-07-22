import React, { useState, Component, useEffect, useCallback } from "react";

const Application = () => {
  const [value, setValue] = useState(1);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div>
        <button onClick={() => setValue((v) => v + 1)}>+</button>
        <button onClick={() => setVisible(false)}>hide</button>

        <ClassCounter value={value} />
        <HookCounter value={value} />
        <Notification value={value} />
        <PlanetInfo id={value} />
      </div>
    );
  } else {
    return <button onClick={() => setVisible(true)}>show</button>;
  }
};

const getPlanet = (id: number) => {
  return fetch(`https://swapi.dev/api/planets/${id}/`)
    .then((res) => res.json())
    .then((data) => data);
};

const useRequest = (request: () => Promise<any>) => {
  const [dataState, setDataState] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;

    request()
      .then((data) => {
        if (!cancelled) {
          setDataState(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });

    return () => {
      cancelled = true;
    };
  }, [request]);

  return dataState;
};

const usePlanetInfo = (id: number) => {
  const request = useCallback(() => getPlanet(id), [id]);
  return useRequest(request);
};

interface PlanetInfoProps {
  id: number;
}

const PlanetInfo: React.FC<PlanetInfoProps> = ({ id }) => {
  const data = usePlanetInfo(id);

  return (
    <div>
      {id} - {(data && data.name) || "Loading..."}
    </div>
  );
};

const HookCounter = ({ value }: { value: number }) => {
  useEffect(() => {
    console.log("useEffect()");
    return () => console.log("clear");
  }, [value]);

  // componentDidMount
  useEffect(() => console.log("mount1"), []);
  // componentDidUpdate
  useEffect(() => console.log("update1"));
  // componentWillUnmount
  useEffect(() => () => console.log("unmount"), []);

  return <p>{value}</p>;
};

const Notification = ({ value }: { value: number }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);
  return <div>{visible && <p>Notification</p>}</div>;
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
