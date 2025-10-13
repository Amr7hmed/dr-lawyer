import {
  IconUploadFile,
  IconVector,
  IconDownload,
  IconFile,
  IconProfileMen,
} from "@/assets/icons";

export default function CaseDetailPageTwo() {
  return (
    <div className="flex w-full gap-2">
      <div className="relative h-full flex-1 overflow-hidden rounded-2xl bg-white px-[27px] py-[40px]">
        <div className="mb-4 w-full justify-center font-['Manrope'] text-xl font-extrabold text-neutral-800">
          Need lawyer for Accidental issue, want to handle it quickly.
        </div>

        <div className="mb-4 inline-flex w-full items-center justify-between">
          <div className="flex items-center justify-start gap-[5px]">
            <IconProfileMen />
            <div className="justify-center font-['Manrope'] text-xs font-medium text-slate-600">
              Stuard Binni
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="flex items-center justify-center gap-2.5 rounded-2xl bg-sky-500/10 px-2.5 py-1">
              <div className="justify-center font-['Manrope'] text-xs font-medium text-sky-500">
                In Progress
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 h-0 w-full outline-1 outline-offset-[-0.50px] outline-slate-300"></div>

        <div className="w-full justify-center font-['Manrope'] text-lg font-bold text-neutral-800">
          Case Description
        </div>
        <div className="mb-3 w-full justify-center font-['Manrope'] text-base font-medium text-neutral-800">
          I was involved in a car accident yesterday and need legal assistance
          to handle the situation quickly. I have complete dashcam video footage
          of the incident, along with photos and a police report. The other
          party was at fault, and I’m looking for guidance on how to proceed
          with claims, possible compensation, and any immediate legal steps I
          should take.
          <br />
          <br />
          I'm hoping to connect with a lawyer experienced in personal injury and
          traffic accident cases who can help me assess the case and move
          forward without delay.
        </div>

        <div className="mb-4 inline-flex h-min w-full flex-col items-start justify-start gap-2.5 rounded-2xl bg-slate-100 px-4 py-3.5">
          <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="justify-center font-['Manrope'] text-sm font-medium text-neutral-800">
                Start Date
              </div>
              <div className="justify-center text-right font-['Manrope'] text-sm font-semibold text-neutral-800">
                May 5, 2025
              </div>
            </div>
            <div className="h-0 self-stretch outline-1 outline-offset-[-0.50px] outline-slate-300"></div>
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="justify-center font-['Manrope'] text-sm font-medium text-neutral-800">
                Deadline
              </div>
              <div className="justify-center text-right font-['Manrope'] text-sm font-semibold text-neutral-800">
                May 30, 2025
              </div>
            </div>
            <div className="h-0 self-stretch outline-1 outline-offset-[-0.50px] outline-slate-300"></div>
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="justify-center font-['Manrope'] text-sm font-medium text-neutral-800">
                Client Location
              </div>
              <div className="justify-center text-right font-['Manrope'] text-sm font-semibold text-neutral-800">
                Abu Dhabi, UAE
              </div>
            </div>
            <div className="h-0 self-stretch outline-1 outline-offset-[-0.50px] outline-slate-300"></div>
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="justify-center font-['Manrope'] text-sm font-medium text-neutral-800">
                Total
              </div>
              <div className="justify-center text-right font-['Manrope'] text-sm font-semibold text-neutral-800">
                AED 2400
              </div>
            </div>
          </div>
        </div>

        <div className="justify-center font-['Manrope'] text-base font-bold text-neutral-800">
          Attachments
        </div>
        <br />

        <div className="h-28 w-full rounded-[10px] bg-slate-100 p-[10px]">
          <div className="inline-flex w-full flex-col items-center justify-start gap-2">
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="flex items-center gap-2">
                <IconVector />
                <div className="justify-center font-['Manrope'] text-sm font-semibold text-blue-600">
                  Video file.mp4
                </div>
              </div>
              <IconDownload />
            </div>
            <div className="h-0 self-stretch outline-1 outline-offset-[-0.50px] outline-slate-300"></div>
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="flex items-center gap-2">
                <IconVector />
                <div className="justify-center font-['Manrope'] text-sm font-semibold text-blue-600">
                  Video file.mp4
                </div>
              </div>
              <IconDownload />
            </div>
          </div>
        </div>

        <br />

        <div className="mb-2 justify-center font-['Manrope'] text-base font-bold text-neutral-800">
          Send message
        </div>
        <textarea className="mb-3 h-28 w-full resize-none rounded-2xl border border-slate-300 bg-white" />
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="relative mx-auto inline-flex h-14 w-72 cursor-pointer items-center justify-center gap-[5px] rounded-[32px] bg-red-900 shadow-[15px_0px_30px_0px_rgba(70,195,255,0.08)] outline-1 outline-offset-[-0.50px]"
          >
            <div className="justify-start font-['Manrope'] text-base leading-normal font-bold text-white">
              Contact Client
            </div>
          </button>
        </div>
      </div>
      {/* Timeline */}
      <div className="relative flex h-min w-120 flex-col gap-6 overflow-auto rounded-2xl bg-white p-2.5 pt-5">
        <div className="justify-center font-['Manrope'] text-xl font-bold text-neutral-800">
          Timeline
        </div>

        <div className="w-full justify-center font-['Manrope'] text-base font-bold text-neutral-800">
          Agreement
        </div>

        <div className="flex w-full items-center justify-between rounded-[10px] bg-slate-100 p-[14px]">
          <div className="flex items-center gap-1.5">
            <IconFile />
            <div className="justify-center font-['Manrope'] text-base font-semibold text-neutral-800">
              View Contract
            </div>
          </div>
          <div className="relative h-7 w-32 rounded-2xl bg-neutral-800">
            <div className="absolute top-[1px] left-[119px] h-1.5 w-1.5 rounded-full bg-red-400 outline-1 outline-slate-100" />
            <div className="absolute top-[7px] left-[20px] inline-flex w-20 items-center justify-start gap-[5px]">
              <div className="justify-center font-['Manrope'] text-xs font-medium text-white">
                Sign Contract
              </div>
            </div>
          </div>
        </div>

        <div className="border-Overlays-Default/20  h-96 w-full flex items-center justify-center rounded-xl border p-[17px]">
          <div className="h-full w-full rounded-lg border bg-slate-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="203" height="130" viewBox="0 0 203 130" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M199.837 26.755C199.513 27.1625 196.446 31.1459 193.022 35.6081C186.047 44.6981 181.992 48.7481 180.39 48.2238C178.655 47.6563 177.879 44.7969 178.464 41.1218C178.942 38.1125 179.227 37.5559 180.845 36.4527C185.311 33.4106 187.291 27.5131 184.781 24.732C183.035 22.797 180.237 24.626 178.639 28.7456C177.898 30.6544 176.963 32.0319 176.293 32.2026C174.749 32.5948 174.268 34.182 175.093 36.1582C175.475 37.0737 175.59 38.3322 175.348 38.9553C173.867 42.775 175.304 49.5029 178.118 51.9211C180.757 54.189 183.033 53.4908 187.135 49.1541C192.622 43.3527 202.179 30.8211 202.351 29.2021C202.53 27.5183 200.672 25.709 199.837 26.755ZM169.514 24.6668C167.651 24.5134 163.632 27.7711 162.667 30.2177C161.919 32.115 161.034 31.8231 161.255 29.7518C161.43 28.1075 159.933 26.6512 158.609 27.1792C157.336 27.6868 156.535 29.8959 157.093 31.3615C158.289 34.5077 154.856 44.6516 150.156 51.8604C148.583 54.2724 146.279 54.9314 145.636 53.1537C145.171 51.8662 145.726 42.8094 146.374 41.1176C146.977 39.5433 145.999 37.3924 144.883 37.8375C144.455 38.0079 142.361 42.4384 140.229 47.6823C136.41 57.0725 133.321 62.0936 132.039 60.992C131.461 60.4954 132.884 54.1229 135.307 46.3485C137.167 40.3822 137.222 38.8959 135.597 38.5127C133.952 38.1248 129.072 52.9199 128.812 59.0844C128.583 64.4926 130.138 66.9016 133.173 65.841C135.307 65.0956 138.902 60.363 140.537 56.1462C141.794 52.9068 141.895 52.9015 142.951 56.0182C144.474 60.5118 149.862 60.1017 152.641 55.2796L154.094 52.7586L153.847 55.6679C153.69 57.5254 153.958 58.8842 154.588 59.4258C155.965 60.6094 156.396 59.7865 158.14 52.6263C160.935 41.157 167.583 27.7104 169.601 29.4446C169.841 29.6502 169.876 31.4758 169.68 33.5012C169.308 37.3508 169.997 38.7774 171.76 37.8063C173.199 37.0136 173.55 29.571 172.274 26.9087C171.154 24.5718 171.469 24.8274 169.514 24.6668ZM146.294 8.61536C145.781 8.88952 141.871 11.7095 137.606 14.8817C133.341 18.0538 129.571 20.5452 129.229 20.4187C128.88 20.2896 129.377 16.3609 130.362 11.4533C131.874 3.9241 131.978 2.55747 131.118 1.55392C129.528 -0.302996 128.672 1.79395 126.505 12.8561L124.499 23.0992L120.933 24.193C118.972 24.7956 116.62 24.9116 115.707 24.4513C112.515 22.8444 109.789 25.1518 110.674 28.7117C111.007 30.0508 111.479 30.3879 113.322 30.6036C114.557 30.7487 116.006 31.5015 116.544 32.277C117.626 33.8366 119.687 33.2408 119.65 31.3793C119.627 30.2642 122.16 28.5689 122.899 29.2041C123.112 29.3868 122.381 33.9654 121.275 39.3796L119.264 49.223L113.958 58.2733C106.049 71.7632 106.377 71.5584 105.828 63.3517C105.329 55.907 104.424 55.7682 100.805 62.5791C97.521 68.7602 95.3548 71.3545 94.2633 70.4166C93.6446 69.885 93.9889 68.7178 96.315 63.4537C97.8519 59.9755 99.9716 56.1555 101.025 54.9658C102.866 52.8888 103.023 52.8853 104.98 54.8738C106.678 56.5991 107.144 56.7313 107.775 55.6659C108.778 53.9745 107.899 51.2188 105.775 49.3935C104.51 48.307 103.451 48.1992 101.724 48.9828C99.1402 50.1546 97.7697 51.9258 92.9537 60.3161C89.4184 66.4759 85.9448 71.2467 85.3604 70.7445C85.1589 70.5714 84.7325 68.8188 84.4138 66.8506C83.7457 62.7243 82.3704 59.2 80.9537 57.9827C79.3647 56.6172 75.8461 59.0567 73.8608 62.8995C72.8877 64.7829 71.9399 66.1933 71.7545 66.0339C71.569 65.8746 71.924 63.4671 72.5434 60.6855C73.8178 54.9613 73.1609 52.0912 70.5483 51.9654C68.6214 51.8733 67.7601 54.4461 68.9756 56.6654C70.1958 58.8936 69.2184 61.7794 66.2122 64.8238C65.0586 65.9926 62.9954 68.5458 61.6274 70.4987C59.2973 73.8247 59.0886 73.9396 58.3135 72.3222C57.8584 71.3727 57.5511 69.6826 57.631 68.5665C57.7108 67.4503 57.3639 65.5137 56.8603 64.2623C56.0394 62.2226 55.712 61.9612 53.6832 61.7227C52.253 61.5558 50.6139 62.2367 49.2276 63.5754C46.4794 66.2292 40.6315 74.2482 38.4737 78.3237C35.661 83.6345 32.5397 87.7616 30.9513 88.2706C29.4619 88.7469 29.429 88.6918 29.6854 86.1118C29.8297 84.6551 30.8649 79.7635 31.9857 75.2418C33.908 67.4865 33.9549 66.9614 32.8096 65.9772C31.6458 64.9771 31.5296 65.1246 30.0048 69.5147C28.2397 74.5988 26.544 82.9237 26.4121 87.1554C26.2858 91.2015 27.562 93.4529 30.0814 93.6273C32.6859 93.8069 35.7244 90.8622 39.0138 84.9718L41.6103 80.3218L42.6683 83.5745C44.7808 90.0659 46.7753 89.842 52.0489 82.5192C53.7542 80.1511 55.073 78.7673 54.9799 79.4442C54.887 80.1223 53.1132 83.9782 51.0388 88.0147C45.5505 98.6943 40.4163 112.237 39.8635 117.493C39.2712 123.127 40.274 128.188 42.1404 128.98C46.5345 130.844 52.0899 116.521 56.6018 91.6949L58.1243 83.3189L61.9996 77.136C64.1307 73.7357 66.0444 71.0999 66.2519 71.2782C66.46 71.457 66.0903 73.8748 65.431 76.6521C64.7712 79.4289 64.3121 82.4002 64.4103 83.2544C64.6267 85.1457 66.1563 86.5867 67.1237 85.8114C67.5136 85.4991 69.7714 80.8205 72.142 75.4141C76.3545 65.8072 78.6269 61.9668 79.6023 62.805C79.8692 63.0343 80.6098 65.4657 81.249 68.2089C82.8841 75.2264 85.697 77.2955 88.7946 73.7583C90.0348 72.3419 90.4067 72.3074 90.9294 73.5594C91.2777 74.3941 91.9343 75.3961 92.3881 75.7861C93.8545 77.0461 97.6453 74.8206 100.171 71.2168L102.606 67.7419L103.738 70.7225C105.866 76.3312 108.344 75.4033 113.096 67.2179C114.766 64.3424 116.262 61.9378 116.42 61.8746C116.579 61.8113 115.653 67.0289 114.365 73.4687C111.712 86.7212 111.412 90.1385 112.797 91.3291C113.968 92.3352 116.373 90.8022 117.276 88.4732C117.887 86.898 117.621 86.0825 116.19 85.1479C115.882 84.9467 116.687 79.5207 117.977 73.0895C119.269 66.6588 121.851 53.7726 123.717 44.4534L127.11 27.5095L132.943 23.8025C140.725 18.8575 147.179 13.4292 147.727 11.3683C148.272 9.31823 147.556 7.9422 146.294 8.61536ZM25.435 20.2179C23.4241 19.7984 20.0122 22.0024 17.3192 25.4605C15.3852 27.9432 13.9964 30.8465 10.7999 39.0866C7.24914 48.2398 6.704 50.115 6.4672 53.9882C5.93206 62.745 8.61122 73.9527 13.4882 83.357C18.6154 93.2456 19.5726 95.5042 19.9411 98.5892C20.4452 102.81 19.2806 105.541 16.0663 107.679C11.5097 110.71 8.55624 110.01 5.96939 105.287C4.30877 102.255 3.11827 95.2101 3.41018 90.1446C3.59747 86.8929 3.38448 85.0704 2.75279 84.5276C1.28688 83.268 0.283809 85.2233 0.0657324 89.7669C-0.222524 95.7799 0.895378 102.381 3.00684 107.127C6.20888 114.324 9.93634 116.085 15.7656 113.158C25.1091 108.466 25.9267 97.6632 17.9907 83.7445C11.9898 73.2198 9.24334 63.2618 9.84827 54.2249C10.4682 44.9646 17.947 28.8341 23.0217 25.8121C28.4499 22.5782 32.1193 37.2615 28.3663 47.2004C26.4101 52.3815 24.7341 54.705 23.7301 53.6298C22.1471 51.9345 21.5876 51.8686 21.0283 53.3107C20.7169 54.1132 20.641 55.2815 20.8585 55.9073C21.0766 56.5335 21.2442 57.934 21.2316 59.0202C21.185 63.001 22.9035 62.8961 26.1083 58.723C30.0236 53.6236 32.7904 46.631 33.1752 40.8614C33.8508 30.7354 30.287 21.2298 25.435 20.2179ZM35.0557 51.1205C34.0926 51.5046 32.3676 56.8565 32.7331 58.3274C33.3114 60.6522 34.9916 60.4974 35.9485 58.0307C37.412 54.2581 36.9109 50.3801 35.0557 51.1205ZM54.658 69.1192C54.9376 71.0549 54.7309 71.5394 51.6457 76.1832C49.8234 78.9255 47.8266 81.6375 47.2082 82.2091C46.1145 83.2199 46.0726 83.1639 45.6932 80.1743C45.0529 75.1334 48.044 69.2848 52.3851 67.0914C53.9921 66.2793 54.2849 66.5399 54.658 69.1192ZM50.1548 106.053C48.007 115.185 45.1286 122.971 43.688 123.546C42.9437 123.843 42.7943 120.069 43.4099 116.518C44.363 111.024 51.5763 93.8837 52.2043 95.621C52.3388 95.9929 51.4163 100.687 50.1548 106.053Z" fill="#485470" />
            </svg>
          </div>
        </div>


        <div className="inline-flex w-full flex-col items-start justify-start gap-2.5 rounded-2xl bg-slate-100 px-4 py-3.5">
          <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="justify-center font-['Manrope'] text-sm font-medium text-neutral-800">
                Client
              </div>
              <div className="h-5 w-12 justify-center text-right font-['Manrope'] text-sm font-semibold text-neutral-800">
                Signed
              </div>
            </div>
            <div className="h-0 self-stretch outline-1 outline-offset-[-0.50px] outline-slate-300"></div>
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="justify-center font-['Manrope'] text-sm font-medium text-neutral-800">
                You
              </div>
              <div className="justify-center text-right font-['Manrope'] text-sm font-semibold text-neutral-800">
                Waiting for sign
              </div>
            </div>
          </div>
        </div>

        <div className="h-0 w-full outline-1 outline-offset-[-0.50px] outline-slate-300"></div>

        <div className="flex w-full flex-col gap-2">
          <div className="justify-center self-stretch font-['Manrope'] text-base font-bold text-neutral-800">
            Deliver Case Update
          </div>

          <label className="inline-flex h-14 w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl bg-slate-100 px-32 py-4 outline-1 outline-offset-[-0.5px] outline-slate-300">
            <input
              type="file"
              className="hidden"
              onChange={(e) => console.log(e.target.files)}
            />
            <div className="inline-flex items-center justify-center gap-2">
              <IconUploadFile />
              <span className="justify-center font-['Manrope'] text-sm font-semibold text-slate-600">
                Attach File
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
