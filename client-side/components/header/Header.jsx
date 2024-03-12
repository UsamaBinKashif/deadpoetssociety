/* eslint-disable @next/next/no-img-element */
const Header = () => {
  return (
    <header class="">
      <div class="container mx-auto flex pt-5  justify-between items-center">
        <img src="/icon.png" alt="main-icon" className="max-w-[50px]" />

        <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base">
          Button
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
