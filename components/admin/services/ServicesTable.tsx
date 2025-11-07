'use client'
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { deleteService, fetchServices, selectServiceState, toggleServiceStatus } from '@/lib/features/service/serviceSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { Plus } from 'lucide-react';
import React, { useEffect } from 'react'
import AddServiceModal from './AddServiceModal';

const ServicesTable = () => {
    const dispatch = useAppDispatch();
    const { services, loading } = useAppSelector(selectServiceState);

  // Fetch all services on mount
  useEffect(() => {
    dispatch(fetchServices({isAdmin:true}));
  }, [dispatch]);

  return (
    <div className="mt-6">
      <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
        {/* Header Buttons */}
        <div className="flex flex-wrap justify-between items-center gap-2 p-4">
          <AddServiceModal/>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn text-lg font-medium bg-primary text-primary-foreground hover:opacity-90"
            >
              <i className="mgc_settings_3_line"></i>
            </button>
            <Button
              type="button"
              className="text-sm font-medium bg-muted text-foreground hover:opacity-80"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto">
          <table className="w-full divide-y divide-border">
            <thead className="bg-muted/10 text-foreground">
              <tr>
                {[
                  "Service Name",
                  "Description",
                  "Duration (hrs)",
                  "Price (₹)",
                  "Buffer (Before/After)",
                  "Status",
                  "Created At",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-3 py-3.5 text-left text-sm font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-6 text-sm text-muted-foreground"
                  >
                    Loading services...
                  </td>
                </tr>
              ) : services.length > 0 ? (
                services.map((service) => (
                  <tr
                    key={service._id}
                    className="hover:bg-muted/5 transition-colors duration-150"
                  >
                    {/* Name */}
                    <td className="whitespace-nowrap py-4 ps-4 pe-3 text-sm font-medium">
                      {service.name}
                    </td>

                    {/* Description */}
                    <td className="whitespace-nowrap py-4 pe-3 text-sm max-w-xs truncate">
                      {service.description || "—"}
                    </td>

                    {/* Duration */}
                    <td className="whitespace-nowrap py-4 pe-3 text-sm">
                      {service.duration}
                    </td>

                    {/* Price */}
                    <td className="whitespace-nowrap py-4 pe-3 text-sm">
                      ₹{service.price}
                    </td>

                    {/* Buffer */}
                    <td className="whitespace-nowrap py-4 pe-3 text-sm">
                      {service.bufferBefore}/{service.bufferAfter} min
                    </td>

                    {/* Status Toggle */}
                    <td className="whitespace-nowrap py-4 pe-3 text-sm">
                      <Switch
                        checked={service.active}
                        onCheckedChange={() =>
                          dispatch(toggleServiceStatus(service._id))
                        }
                      />
                    </td>

                    {/* Created At */}
                    <td className="whitespace-nowrap py-4 pe-3 text-sm">
                      {new Date(service.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    {/* Actions */}
                    <td className="whitespace-nowrap py-4 px-3 text-center text-sm">
                      <button
                        className="me-2 text-accent hover:opacity-80"
                        aria-label="Edit Service"
                      >
                        <i className="mgc_edit_line text-lg"></i>
                      </button>
                      <button
                        onClick={() => dispatch(deleteService(service._id))}
                        className="text-destructive hover:opacity-80"
                        aria-label="Delete Service"
                      >
                        <i className="mgc_delete_line text-lg"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-6 text-sm text-muted-foreground"
                  >
                    No services available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServicesTable