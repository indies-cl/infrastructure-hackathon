import { Popover } from '@base-ui/react/popover'

/** Logo that opens a name and description on hover, focus or tap. */
export function OrgLogo({
  name,
  description,
  logo,
  size,
}: {
  name: string
  description: string
  logo: string
  size: number
}) {
  return (
    <Popover.Root>
      <Popover.Trigger
        openOnHover
        delay={100}
        className="block outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d4aff]"
      >
        <img
          src={logo}
          alt={name}
          width={size}
          height={size}
          decoding="async"
          className="size-12 object-contain md:size-14"
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="top" sideOffset={8} className="z-50">
          <Popover.Popup className="flex w-72 max-w-[calc(100vw-2rem)] origin-[var(--transform-origin)] flex-col gap-1 bg-[#181818] p-3 font-mono text-base leading-6 text-[#f4f2ee] outline-none transition-opacity duration-75 ease-linear data-ending-style:opacity-0 data-starting-style:opacity-0">
            <Popover.Title className="text-base leading-6">{name}</Popover.Title>
            <Popover.Description className="text-base leading-6 text-[#9a9890]">
              {description}
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
