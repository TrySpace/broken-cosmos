The initial render works with the `StoreWrapper` setup...


But change this:

```tsx
export function StoreWrapper({ children }: StoreWrapperProps) {
  return (
    <Routification>{children}</Routification>
  )
}

```

Into:

```tsx
export function StoreWrapper({ children }: StoreWrapperProps) {
  return (
    <>{children}</>
  )
}
```

And it will work