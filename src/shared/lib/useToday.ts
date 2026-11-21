"use client";

import { useState } from "react";
import { startOfToday } from "@/shared/lib/date.util";

export const useToday = (): Date => useState(startOfToday)[0];
