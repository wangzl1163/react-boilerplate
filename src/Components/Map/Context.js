/*
 * @Description: map context
 * @Author:
 * @Date: 2023-11-13 13:35:39
 * @LastEditTime: 2023-11-13 13:41:13
 * @LastEditors:
 */
import { createContext } from "react";

export const MapContext = createContext({ getCurrentMarker: () => null });
