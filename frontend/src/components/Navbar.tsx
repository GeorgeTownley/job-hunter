import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Use optional chaining and provide fallback values
  const userProfileImage = session?.user?.image ?? "/default-profile.png";
  const userName = session?.user?.name ?? "User";

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Left side content of navbar */}
          <div className="flex-1 flex items-center justify-start">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="/assets/bow_arrow.png"
                alt="Bow & arrow logo"
              />
            </div>
          </div>
          {session?.user && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={userProfileImage}
                  alt={userName}
                />
                <button
                  onClick={handleLogout}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
