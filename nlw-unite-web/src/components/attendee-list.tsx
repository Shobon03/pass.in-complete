import { ChangeEvent, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { IconButton } from "./icon-button";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { attendees as fakeAttendees } from "../data/attendees";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");
dayjs.extend(relativeTime);

export type Attendee = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  checkedIdAt: Date;
};

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search"))
      return url.searchParams.get("search") ?? "";

    return "";
  });

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page"))
      return Number(url.searchParams.get("page"));

    return 1;
  });

  const [total, setTotal] = useState(fakeAttendees.length);
  const [attendees, setAttendees] = useState<Attendee[]>(fakeAttendees);

  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL("http://localhost:3333/events/${}/attendees?");

    url.searchParams.set("pageIndex", String(page - 1));

    if (search.length > 0) url.searchParams.set("query", search);

    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setAttendees(data.attendees);
    //     setTotal(data.total);
    //   });
  }, [page, search]);

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setPage(1);
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());
    url.searchParams.set("search", String(search));

    window.history.pushState({}, "", url);

    setSearch(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1>Participantes</h1>

        <div className="flex items-center gap-3 rounded-lg  border border-white/10 px-3 py-1.5 text-sm">
          <Search className="size-4" />
          <input
            placeholder="Buscar participante..."
            className="flex-1 border-0 border-none bg-transparent p-0 text-sm outline-none focus:ring-0"
            onChange={onSearchInputChanged}
            value={search}
          />
        </div>
      </div>
      <Table>
        <thead>
          <TableRow>
            <TableHeader
              style={{
                width: 48,
              }}
            >
              <input
                type="checkbox"
                className="size-4 rounded border border-white/10 bg-black/20"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader
              style={{
                width: 64,
              }}
            ></TableHeader>
          </TableRow>
        </thead>

        <tbody>
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
            return (
              <TableRow key={attendee.id} className="border-b border-white/10">
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 rounded border border-white/10 bg-black/20 accent-orange-400"
                  />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-white">{attendee.name}</span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>{dayjs().to(attendee.checkedIdAt)}</TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>

        <tfoot>
          <TableRow>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell colSpan={3} className="text-right">
              <div className="inline-flex items-center gap-8 ">
                <span>
                  Página {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  );
}
