interface HeaderItemProps {
  name: string;
  Icon: React.ComponentType;
}

export default function HeaderItem({name, Icon}: HeaderItemProps) {
  return (
    <div className="flex items-center text-white gap-3
    text-[15px] font-semibold cursor-pointer hover:underline underline-offset-8">
      <Icon  />
      <h2 className="hidden md:block">{name}</h2>
    </div>
  )
}
