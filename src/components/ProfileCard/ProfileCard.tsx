import {
  Bell,
  Code,
  ExternalLink,
  Mail,
  MapPin,
  PenSquare,
  Phone,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AccountType, Roles } from '../../types/auth';

export interface IProfile {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  location?: string | null;
  imageUrl?: string | null;
  org?: string;
  notifications?: number;
  isActive: boolean;
  type?: AccountType;
  role?: Roles;
}

const ProfileCard = ({
  id,
  name,
  email,
  phone,
  imageUrl,
  org,
  notifications,
  location,
}: IProfile) => {
  return (
    <div
      key={id}
      className="bg-[#FAF9F9] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
    >
      <div className="absolute top-4 right-4">
        <button
          // onClick={() => handleNotification(user.id)}
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group"
          title="Toggle notifications"
        >
          <Bell className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
          {notifications && notifications > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
              <User color="#00A980" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">ID: {id}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            {email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            {phone}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 group">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {location}
            </div>
            {/* <button
              // onClick={() => handleEditLocation(user.id)}
              className="p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Edit location"
            >
              <PenSquare className="h-4 w-4 text-gray-500" />
            </button> */}
          </div>
          {/* <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {org}
          </div> */}
        </div>
      </div>
      <div className="flex w-full justify-between p-4 border-t border-gray-100 bg-white">
        <Link
          to={`/admin/users/${id}`}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View Full Profile
        </Link>
        <ExternalLink color="#5D97ED" className="h-4 w-4 ml-1" />
      </div>
    </div>
  );
};

export default ProfileCard;
