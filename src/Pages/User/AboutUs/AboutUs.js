import { AiFillRightCircle } from 'react-icons/ai';
function AboutUs() {
  return (
    <div className="flex-1 flex-col justify-center">
      <div className="flex justify-center  mb-10 mt-5 text-5xl font-extrabold text-slate-900 ">ABOUT US</div>
      <div
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=600")`,
        }}
        className="w-full h-[500px] bg-no-repeat bg-center bg-contain opacity-100"
      ></div>
      <div className="flex-1 flex">
        <div className="flex-1 flex-col w-2/3 mt-10 ml-24 ">
          <div className="flex justify-center text-3xl text-slate-800 font-semibold mb-10">
            We bring FURNITURE to every home
          </div>
          <div className="flex justify-center w-96 h-96 ml-40">
            <img
              src="https://images.pexels.com/photos/12497792/pexels-photo-12497792.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="furniture-1"
            />
          </div>
        </div>

        <p className="flex-1 flex w-28 mr-24 ml-40 mt-52 font-bold text-cyan-900 text-4xl">
          "With our passion, we want to contribute to a healthy, safe, smart, sustainable and fun society."
        </p>
      </div>

      <div className="flex justify-center text-5xl font-extrabold text-slate-900 mt-10">OUR STORY</div>
      <div className="flex justify-center text-3xl items-center mt-10">
        <div className="text-slate-800 font-semibold">Vision:</div> &nbsp;
        <div className="text-3xl text-gray-800">
          Become the leading furniture and decoration brand in Vietnam, helping to build many more homes everyday.
        </div>
      </div>
      <div className="flex justify-center text-3xl items-center mt-4">
        <div className="text-slate-800 font-semibold">Mission:</div> &nbsp;{' '}
        <div className="text-3xl text-gray-800">Bringing the most suitable furniture and services to everyone.</div>
      </div>

      <div className="flex justify-center text-5xl font-extrabold text-slate-900 mt-10">WHY US?</div>
      <div className="flex justify-center text-3xl font-semibold mt-10">Irresistible Post-Sale Services</div>
      <div className="flex justify-center text-3xl font-semibold mt-4">Dedicated Staff Members</div>
      <div className="flex justify-center text-3xl font-semibold mt-4">
        Always Improve Curselves To Bring The Best Services To Every Customer
      </div>
      <div className="flex justify-center text-5xl font-extrabold text-slate-900 mt-10 border border-slate-700">
        PROFESSIONAL INTERIOR DESIGN & CONSULTANT SERVICES
      </div>
      <div className="flex justify-center text-3xl text-gray-800 mt-4">
        <AiFillRightCircle className="mt-1 mr-2" /> A to Z design & building package
      </div>
      <div className="flex justify-center text-3xl text-gray-800 mt-4">
        <AiFillRightCircle className="mt-1 mr-2" />
        Reasonable fee
      </div>
      <div className="flex justify-center text-3xl text-gray-800 mt-4">
        <AiFillRightCircle className="mt-1 mr-2" />
        Quick delivery time from 3~5 days *{' '}
      </div>
      <div className="flex justify-center text-5xl font-extrabold text-slate-900 mt-10">
        TOGETHER WITH VIETNAMESE FAMILIES
      </div>
      <div className="flex justify-center ml-52 mr-52 mt-10 mb-10 italic">
        "During the 14 years of development, FURNITURE ONLINE STORE is proud to accompany hundreds of thousand
        individuals and families through our products and services. Together with FURNITURE ONLINE STORE to continue on
        this journey and create beautiful homes as to us, a house is not only a place to rest, but also a home to
        cherish the mind and where cultural values maintained and promoted."
      </div>
    </div>
  );
}
export default AboutUs;
