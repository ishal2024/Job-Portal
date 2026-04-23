import React, { useState } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { addDashboardDetail } from '../../Store/userSlicer';
import { recruiterDashboard } from '../../axios/dashboardApi';
import { deleteJobPost } from '../../axios/jobsApi';
import { useDispatch } from 'react-redux';

const DeleteConfirmationModal = ({ onClose, job }) => {

  const dispatch = useDispatch()

  async function handleDeleteJobPost(postId) {
    try {
      const res = await deleteJobPost(postId)
      if (res?.data?.status) {
        const dashboardData = await recruiterDashboard()
        if (dashboardData?.data?.status)
          dispatch(addDashboardDetail(dashboardData?.data?.data))
        onClose()
      }
    } catch (error) {
      console.log(error?.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">



      {/* --- Backdrop Overlay --- */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      ></div>

      {/* --- Modal Card --- */}
      <div
        className="relative flex items-center justify-center w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200 p-6 sm:p-8 flex-col  gap-5 border border-slate-100"
        role="dialog"
        aria-modal="true"
      >

        <div class="w-full py-2.5 font-medium text-sm text-white text-center bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
          <p>Special Deal: Free Shipping on Orders Above $50! | 20% OFF on First Purchase</p>
        </div>

        {/* Close Button (Optional UX enhancement) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* --- Content --- */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4">

          {/* Icon Wrapper */}
          <div className=" h-14  w-full rounded-full flex items-center justify-center shrink-0  ">
            <Trash2 className="w-7 h-7 text-red-600" />
          </div>

          {/* Text Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              Delete Job Post?
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Are you sure you want to delete the <span className="font-semibold text-slate-700">"{job?.position}"</span> job listing? This action cannot be undone and all applicant data associated with it will be permanently removed.
            </p>
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-2 w-full">

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all focus:ring-4 focus:ring-slate-100 focus:outline-none"
          >
            Cancel
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDeleteJobPost(job?._id)}
            className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold shadow-lg shadow-red-500/30 hover:bg-red-700 hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all focus:ring-4 focus:ring-red-500/20 focus:outline-none flex items-center justify-center gap-2 group"
          >
            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Delete Job</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;