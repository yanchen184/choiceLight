import { Progress } from "antd";

const HexagonAttribute = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  return (
    <div className="text-center">
      <div className="relative w-32 h-56">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 m-auto"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          <polygon
            fill="none"
            stroke="#3182CE"
            strokeWidth="1"
            points="50,0 100,25 100,75 50,100 0,75 0,25"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
          {label}
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-2xl">
          {value}
        </div>
      </div>
      <Progress
        type="circle"
        percent={value}
        width={80}
        strokeWidth={8}
        strokeColor="#3182CE"
      />
    </div>
  );
};

export default HexagonAttribute;
