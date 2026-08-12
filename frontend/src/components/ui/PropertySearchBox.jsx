import React from 'react';
import { FiSearch, FiMapPin, FiHome, FiDollarSign } from 'react-icons/fi';
import Button from './Button';

const PropertySearchBox = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl border border-white/20 mx-auto max-w-5xl w-full -mt-16 md:-mt-24 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-primary-900/10 pb-4 md:pb-0 md:pr-4">
          <label className="text-xs font-heading font-semibold text-primary-600 uppercase tracking-wider flex items-center gap-1">
            <FiMapPin /> Location
          </label>
          <select className="bg-transparent text-sm font-body text-text-dark font-medium outline-none cursor-pointer w-full mt-1">
            <option value="">All Locations</option>
            <option value="mumbai">Mumbai, Maharashtra</option>
            <option value="pune">Pune, Maharashtra</option>
            <option value="nashik">Nashik, Maharashtra</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-primary-900/10 pb-4 md:pb-0 md:pr-4 md:pl-2">
          <label className="text-xs font-heading font-semibold text-primary-600 uppercase tracking-wider flex items-center gap-1">
            <FiHome /> Property Type
          </label>
          <select className="bg-transparent text-sm font-body text-text-dark font-medium outline-none cursor-pointer w-full mt-1">
            <option value="">Any Type</option>
            <option value="residential">Residential Plot</option>
            <option value="commercial">Commercial Land</option>
            <option value="villa">Luxury Villa</option>
            <option value="farmhouse">Farm House</option>
          </select>
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-1 pb-4 md:pb-0 md:pr-4 md:pl-2">
          <label className="text-xs font-heading font-semibold text-primary-600 uppercase tracking-wider flex items-center gap-1">
            <FiDollarSign /> Budget Range
          </label>
          <select className="bg-transparent text-sm font-body text-text-dark font-medium outline-none cursor-pointer w-full mt-1">
            <option value="">Any Budget</option>
            <option value="0-50">Under ₹50 Lacs</option>
            <option value="50-100">₹50 Lacs - ₹1 Cr</option>
            <option value="100+">₹1 Cr & Above</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-center md:pl-2">
          <Button variant="primary" fullWidth className="h-full min-h-[50px] shadow-lg rounded-xl text-[0.95rem]" icon={<FiSearch size={18} />}>
            Search Properties
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertySearchBox;
