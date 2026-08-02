import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import MainLayout from "../layout/mainLayout";
import { updateProfileService } from "../services/user";
import { userProfileDetail } from "../Hooks/userProfileDetail";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

 const userDetail = userProfileDetail((state)=>state.userDetail)
  // Fetch Profile
  useEffect(() => {
    getProfile();
  }, [userDetail]);

  const getProfile = async () => {

      setName(userDetail?.name);
      setEmail(userDetail?.email);
      setPhone(userDetail?.phone);
      setProfileImage(userDetail?.image)
         
  };

  // Image Preview
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    setProfileImage(URL.createObjectURL(file));
  };

  // Update Profile
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("phone", phone);

      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }
  await updateProfileService(formData)
   
   
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl p-8">

        <div className="rounded-3xl bg-card-custom p-8 shadow-lg">

          <h1 className="mb-10 text-4xl font-bold text-main">
            My Profile
          </h1>

          {/* Profile Image */}

          <div className="mb-10 flex flex-col items-center">

            <div className="relative">

              <img
                src={profileImage}
                alt="profile"
                className="h-40 w-40 rounded-full border-4 border-primary-custom object-cover"
              />

              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary-custom text-white"
              >
                <Camera />
              </label>

              <input
                id="profile"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

            </div>

          </div>

          {/* Name */}

          <div className="mb-6">

            <label className="mb-2 block text-sm text-main">
              Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-custom bg-input-custom px-4 py-3 outline-none"
            />

          </div>

          {/* Email */}

          <div className="mb-6">

            <label className="mb-2 block text-sm text-main">
              Email
            </label>

            <input
              value={email}
              disabled
              className="w-full rounded-xl border border-custom bg-gray-200 px-4 py-3"
            />

          </div>

          {/* Phone */}

          <div className="mb-8">

            <label className="mb-2 block text-sm text-main">
              Phone
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-custom bg-input-custom px-4 py-3 outline-none"
            />

          </div>

          <div className="flex justify-end">

            <button
              onClick={handleSubmit}
              className="rounded-xl bg-primary-custom px-6 py-3 text-white"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>
    </MainLayout>
  );
};

export default Profile;