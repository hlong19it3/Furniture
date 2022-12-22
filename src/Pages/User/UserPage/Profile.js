function Profile() {
  return (
    <div className="w-full m-h-2/3 flex justify-center items-center p-5">
      <div className="flex-[0.7] rounded-lg drop-shadow flex flex-col justify-around">
        <div className="flex-[0.2] p-2 flex ">
          <label htmlFor="firstName text-sm">First Name:</label>
          <input value={'Long'} id="firstName" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
