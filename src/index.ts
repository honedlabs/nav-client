import { computed } from "vue";
import { usePage } from "@inertiajs/vue3";
import type { Page } from "@inertiajs/core";

export interface NavItem<T extends boolean = false> {
	name: string;
	url: string;
	isActive: boolean;
	icon?: T extends true ? string : never;
}

const page = usePage() as Page<Record<string, NavItem[]>>;

export const useNav = <T extends boolean>(key: string = "nav") =>
	computed(() => page.props[key] as NavItem<T>[]);
