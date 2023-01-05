
interface ChannelDescription {
    name: string;
    description: string;
}

export interface NetworkDescription {
  name: string;
  channels: ChannelDescription[];
}