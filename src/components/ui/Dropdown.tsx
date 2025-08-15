"use client";

import React, { useState, useRef, useEffect, ReactNode, createContext, useContext } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Context for dropdown state
interface DropdownContextValue {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	dropdownRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

const useDropdown = () => {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error("Dropdown components must be used within a DropdownRoot");
	}
	return context;
};

// Root component that provides context
interface DropdownRootProps {
	children: ReactNode;
	className?: string;
}

const DropdownRoot: React.FC<DropdownRootProps> = ({ children, className = "" }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const value = {
		isOpen,
		setIsOpen,
		dropdownRef,
	};

	return (
		<DropdownContext.Provider value={value}>
			<div className={`relative ${className}`} ref={dropdownRef}>
				{children}
			</div>
		</DropdownContext.Provider>
	);
};

// Trigger component
interface DropdownTriggerProps {
	children?: ReactNode;
	icon?: ReactNode;
	label?: string;
	className?: string;
	showChevron?: boolean;
}

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
	children,
	icon,
	label,
	className = "",
	showChevron = true,
}) => {
	const { isOpen, setIsOpen } = useDropdown();

	return (
		<button
			className={`flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 group cursor-pointer ${className}`}
			onClick={() => setIsOpen(!isOpen)}
		>
			{children ? (
				children
			) : (
				<>
					{icon && (
						<span className="group-hover:scale-110 transition-transform duration-200">{icon}</span>
					)}
					{label && <span className="font-medium">{label}</span>}
					{showChevron && (
						<ChevronDownIcon
							className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
						/>
					)}
				</>
			)}
		</button>
	);
};

// Content container
interface DropdownContentProps {
	children: ReactNode;
	className?: string;
	width?: string;
	position?: "left" | "right" | "center";
}

const DropdownContent: React.FC<DropdownContentProps> = ({
	children,
	className = "",
	width = "w-56",
	position = "left",
}) => {
	const { isOpen } = useDropdown();

	const getPositionClasses = () => {
		switch (position) {
			case "right":
				return "right-0";
			case "center":
				return "left-1/2 transform -translate-x-1/2";
			default:
				return "left-0";
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className={`absolute top-full mt-2 ${width} ${getPositionClasses()} bg-white rounded-2xl shadow-xl border border-green-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200 ${className}`}
		>
			{children}
		</div>
	);
};

// Menu container
interface DropdownMenuProps {
	children: ReactNode;
	className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, className = "" }) => {
	return <div className={`space-y-1 ${className}`}>{children}</div>;
};

// Menu item
interface DropdownItemProps {
	children?: ReactNode;
	icon?: ReactNode;
	label?: string;
	description?: string;
	href?: string;
	onClick?: () => void;
	className?: string;
	variant?: "default" | "destructive";
}

const DropdownItem: React.FC<DropdownItemProps> = ({
	children,
	icon,
	label,
	description,
	href,
	onClick,
	className = "",
	variant = "default",
}) => {
	const { setIsOpen } = useDropdown();

	const handleClick = () => {
		if (onClick) {
			onClick();
		}
		setIsOpen(false);
	};

	const variantClasses = {
		default: "text-gray-700 hover:text-green-600 hover:bg-green-50",
		destructive: "text-gray-700 hover:text-red-600 hover:bg-red-50",
	};

	const Component = href ? "a" : "button";

	return (
		<Component
			href={href}
			onClick={handleClick}
			className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 cursor-pointer ${variantClasses[variant]} ${className}`}
		>
			{children ? (
				children
			) : (
				<>
					{icon && <span className="flex-shrink-0">{icon}</span>}
					<div className="flex-1">
						{label && <div className="font-medium">{label}</div>}
						{description && <div className="text-sm text-gray-500">{description}</div>}
					</div>
				</>
			)}
		</Component>
	);
};

// Separator
interface DropdownSeparatorProps {
	className?: string;
}

const DropdownSeparator: React.FC<DropdownSeparatorProps> = ({ className = "" }) => {
	return <div className={`h-px bg-gray-200 my-2 mx-2 ${className}`} />;
};

// Label for grouping
interface DropdownLabelProps {
	children: ReactNode;
	className?: string;
}

const DropdownLabel: React.FC<DropdownLabelProps> = ({ children, className = "" }) => {
	return (
		<div
			className={`px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider ${className}`}
		>
			{children}
		</div>
	);
};

// Export all components
export {
	DropdownRoot,
	DropdownTrigger,
	DropdownContent,
	DropdownMenu,
	DropdownItem,
	DropdownSeparator,
	DropdownLabel,
};

// Default export for backward compatibility
const Dropdown = {
	Root: DropdownRoot,
	Trigger: DropdownTrigger,
	Content: DropdownContent,
	Menu: DropdownMenu,
	Item: DropdownItem,
	Separator: DropdownSeparator,
	Label: DropdownLabel,
};

export default Dropdown;
