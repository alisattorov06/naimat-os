export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
  color: string;
}

export interface WindowState {
  id: string;
  appId: string;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
}

export interface SystemSettings {
  brightness: number;
  volume: number;
  wifi: boolean;
  bluetooth: boolean;
  airdrop: boolean;
  wallpaper: string;
  theme: 'light' | 'dark';
  focusMode: boolean;
  stageManager: boolean;
}
