import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Check, 
  Edit3,
  Award,
  Globe
} from 'lucide-react';
import { TravelerProfile } from '../types';

interface ProfileViewProps {
  currentUser: TravelerProfile;
  onUpdateUser: (updated: TravelerProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ currentUser, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(currentUser.bio);
  const [city, setCity] = useState(currentUser.city);
  const [occupation, setOccupation] = useState(currentUser.occupation);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...currentUser,
      bio,
      city,
      occupation
    });
    setIsEditing(false);
  };

  return (
    <div id="profile-view-wrapper" className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      
      {/* Profile Card Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-emerald-600/50 shadow-xl shrink-0"
          />

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-100">{currentUser.name}</h1>
              <span className="bg-emerald-950 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-800 inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Demo Verified
              </span>
            </div>

            <p className="text-xs text-stone-400 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentUser.city} • {currentUser.occupation}</span>
            </p>

            <p className="text-xs sm:text-sm text-stone-200 pt-1 italic">
              "{currentUser.bio}"
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
              {currentUser.badges.map((badge, idx) => (
                <span key={idx} className="bg-stone-950 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-stone-800 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <button
            id="btn-toggle-edit-profile"
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 flex items-center gap-1.5 shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-4">
            <h3 className="text-xs font-bold text-stone-300 uppercase tracking-wider">Update Public Traveler Bio</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-stone-400 block mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
                />
              </div>

              <div>
                <label className="text-xs text-stone-400 block mb-1">Occupation</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-stone-400 block mb-1">Traveler Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-600 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </form>
        )}

      </div>

      {/* Verified Traits & Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-3">
          <h3 className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Travel Styles & Interests
          </h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {currentUser.interests.map((int, i) => (
              <span key={i} className="text-xs bg-emerald-950 text-emerald-300 px-3 py-1 rounded-xl border border-emerald-800 font-semibold">
                {int}
              </span>
            ))}
            {currentUser.travelStyle.map((style, i) => (
              <span key={i} className="text-xs bg-stone-800 text-stone-300 px-3 py-1 rounded-xl border border-stone-700 font-semibold">
                {style}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-3">
          <h3 className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Verified Profile Traits
          </h3>
          <ul className="space-y-2 text-xs text-stone-300">
            {currentUser.verifiedTraits?.map((trait, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{trait}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
