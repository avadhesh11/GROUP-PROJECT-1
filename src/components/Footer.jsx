const Footer = () => {
  return (
    <div className="dark:bg-gray-900 bg-[#222222] w-full h-[25vh] px-50">
      <p className="text-white pb-10 pt-10">MEET THE DEVS</p>
      <div className="flex flex-row justify-between text-[#F0F0E8]">
        <div className="flex flex-col justify-center text-center">
          <a href="">Instagram</a>
          <a href="">Instagram</a>
          <a href="">Instagram</a>
        </div>

        <div className="flex flex-col">
          <a href="">Instagram</a>
          <a href="">Instagram</a>
          <a href="">Instagram</a>
        </div>

        <div className="flex flex-col">
          <p>Email</p>
          <p>Phone</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
