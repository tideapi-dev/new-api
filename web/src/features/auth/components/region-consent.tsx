/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useTranslation } from 'react-i18next'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface RegionConsentProps {
  checked: boolean
  onCheckedChange: (nextValue: boolean) => void
  className?: string
}

/**
 * Tide API: required self-declaration on the sign-up form that the user is
 * not using the service from mainland China. Registration (password and
 * third-party sign-up) stays blocked until this is checked.
 */
export function RegionConsent({
  checked,
  onCheckedChange,
  className,
}: RegionConsentProps) {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'border-border/60 bg-muted/40 flex items-start gap-3 rounded-md border p-3',
        className
      )}
    >
      <Checkbox
        id='region-consent'
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        aria-required='true'
        className='mt-0.5'
      />
      <Label
        htmlFor='region-consent'
        className='text-muted-foreground items-start gap-1 text-left text-xs leading-5 font-normal'
      >
        <span>
          {t('I confirm I am not using this service from mainland China.')}
        </span>
      </Label>
    </div>
  )
}
