"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import { Field, FieldError } from "./ui/field"
import { Input } from "./ui/input"

const formSchema = z.object({
  search: z.string().trim().min(1, {
    message: "Digite algo para buscar",
  }),
})

type SearchFormData = z.infer<typeof formSchema>

const Search = () => {
  const router = useRouter()

  const form = useForm<SearchFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  function handleSubmit(data: SearchFormData) {
    const search = data.search.trim()

    router.push(`/barbershops?search=${encodeURIComponent(search)}`)
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex items-start gap-2"
      noValidate
    >
      <Controller
        name="search"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            className="w-full"
            data-invalid={fieldState.invalid || undefined}
          >
            <Input
              {...field}
              type="search"
              placeholder="Faça sua busca..."
              aria-label="Buscar barbearias"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button size="icon" type="submit" aria-label="Buscar">
        <SearchIcon />
      </Button>
    </form>
  )
}

export default Search
