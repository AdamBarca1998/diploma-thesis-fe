"use client";

import { Property } from "@/types/property";

export const StringInput = ({ property }: { property: Property }) => {

    return (
        <label className="form-control">
            <div className="label">
                <span className="label-text font-bold">{property.name}</span>
            </div>
            <textarea className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
        </label>
    );
};