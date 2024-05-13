import { FC } from "react";
export type TrackProps = {
  onClick?: () => void;
};

const Track: FC<TrackProps> = ({ onClick }) => {

  return (
    <section className="absolute inset-0 flex justify-center items-center">
      <div className="bg-neutral-800 w-96 h-80 rounded-md shadow-lg p-6 shad">
        <h1 className="text-center text-teal-300 text-2xl font-semibold mb-4">
          Track this product
        </h1>
        <p className="text-center text-teal-600 mb-6 text-md">
          We continuously track this product, and when the price drops, we&apos;ll
          inform you through both email and SMS.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onClick}
            type="submit"
            className="bg-indigo-500 text-white py-2 w-36 rounded-lg focus:outline-none hover:bg-indigo-600 transition-colors duration-300"
          >
            Track
          </button>
        </div>
      </div>
    </section>
  );
};

export default Track;
